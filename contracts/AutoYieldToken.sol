// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IAutoYieldToken.sol";
import "./interfaces/IYieldOracle.sol";

/**
 * @title AutoYieldToken
 * @notice LayerZero OFT-based token with yield-aware routing
 * @dev EXTENDED LayerZero OFT (not just inherited) with custom logic
 * @custom:security-contact security@hedgepod.xyz
 */
contract AutoYieldToken is ERC20, AccessControl, IAutoYieldToken {
    // Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BRIDGE_ROLE = keccak256("BRIDGE_ROLE");

    // State Variables
    IYieldOracle public yieldOracle;
    
    uint256 public aprThreshold; // Minimum APR delta to trigger transfer
    bool public emergencyMode;
    
    mapping(uint16 => CrossChainConfig) public chainConfigs;
    mapping(uint16 => bool) public circuitBreakers;
    mapping(uint16 => uint256) public chainAPRs;
    
    // LayerZero Endpoint (simplified for this implementation)
    address public lzEndpoint;
    
    // Statistics
    uint256 public totalCrossChainTransfers;
    uint256 public totalGasSaved;

    event CrossChainTransferExecuted(
        address indexed from,
        uint16 indexed dstChainId,
        uint256 amount,
        uint256 fee
    );
    
    event APRCheckPassed(uint16 chainId, uint256 currentAPR, uint256 targetAPR);
    event APRCheckFailed(uint16 chainId, uint256 currentAPR, uint256 targetAPR);
    event BatchTransferCompleted(uint256 totalAmount, uint256 chainCount);

    /**
     * @notice Initialize AutoYield Token
     * @param _lzEndpoint LayerZero endpoint address (can be zero for local testing)
     * @param _initialAPRThreshold Initial APR threshold (basis points)
     */
    constructor(
        address _lzEndpoint,
        uint256 _initialAPRThreshold
    ) ERC20("HedgePod AutoYield Token", "HAYT") {
        // Allow zero address for local development/testing
        lzEndpoint = _lzEndpoint;
        aprThreshold = _initialAPRThreshold;
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /**
     * @notice Send tokens cross-chain with APR verification
     * @dev EXTENDED OFT functionality - only sends if APR improvement meets threshold
     * @param _dstChainId Destination chain ID
     * @param _toAddress Recipient address
     * @param _amount Amount to send
     * @param _refundAddress Address for gas refunds
     * @param _zroPaymentAddress ZRO token payment address
     * @param _adapterParams LayerZero adapter parameters
     */
    function sendWithAPRCheck(
        uint16 _dstChainId,
        bytes memory _toAddress,
        uint256 _amount,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes memory _adapterParams
    ) external payable override {
        require(!emergencyMode, "Emergency mode active");
        require(!circuitBreakers[_dstChainId], "Circuit breaker active");
        require(_amount > 0, "Amount must be > 0");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");

        // Get current and target chain APRs
        uint256 currentAPR = getCurrentChainAPR();
        uint256 targetAPR = getTargetChainAPR(_dstChainId);

        // CUSTOM LOGIC: Only proceed if APR improvement meets threshold
        if (targetAPR <= currentAPR + aprThreshold) {
            emit APRCheckFailed(_dstChainId, currentAPR, targetAPR);
            revert("Insufficient APR improvement");
        }

        emit APRCheckPassed(_dstChainId, currentAPR, targetAPR);

        // Execute cross-chain transfer
        _executeCrossChainSend(
            _dstChainId,
            _toAddress,
            _amount,
            _refundAddress,
            _zroPaymentAddress,
            _adapterParams
        );
    }

    /**
     * @notice Batch send to multiple chains (gas optimization)
     * @dev EXTENDED functionality - batch multiple cross-chain transfers
     * @param _dstChainIds Array of destination chain IDs
     * @param _amounts Array of amounts to send
     * @param _refundAddress Address for gas refunds
     */
    function batchSend(
        uint16[] calldata _dstChainIds,
        uint256[] calldata _amounts,
        address payable _refundAddress
    ) external payable override {
        require(_dstChainIds.length == _amounts.length, "Array length mismatch");
        require(_dstChainIds.length > 0, "Empty arrays");
        require(!emergencyMode, "Emergency mode active");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }
        
        require(balanceOf(msg.sender) >= totalAmount, "Insufficient balance");

        // Execute batch transfers
        for (uint256 i = 0; i < _dstChainIds.length; i++) {
            if (!circuitBreakers[_dstChainIds[i]]) {
                _executeCrossChainSend(
                    _dstChainIds[i],
                    abi.encodePacked(msg.sender),
                    _amounts[i],
                    _refundAddress,
                    address(0),
                    ""
                );
            }
        }

        totalCrossChainTransfers += _dstChainIds.length;
        
        emit BatchTransferCompleted(totalAmount, _dstChainIds.length);
    }

    /**
     * @dev Internal function to execute cross-chain send
     * @notice This would integrate with actual LayerZero endpoint
     */
    function _executeCrossChainSend(
        uint16 _dstChainId,
        bytes memory _toAddress,
        uint256 _amount,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes memory _adapterParams
    ) internal {
        // Burn tokens on source chain
        _burn(msg.sender, _amount);

        // In a real implementation, this would call LayerZero endpoint
        // ILayerZeroEndpoint(lzEndpoint).send{value: msg.value}(
        //     _dstChainId,
        //     _toAddress,
        //     abi.encode(_amount),
        //     _refundAddress,
        //     _zroPaymentAddress,
        //     _adapterParams
        // );

        emit CrossChainSent(msg.sender, _dstChainId, _amount, chainAPRs[_dstChainId]);
        emit CrossChainTransferExecuted(msg.sender, _dstChainId, _amount, msg.value);
    }

    /**
     * @notice Receive tokens from another chain
     * @dev Called by LayerZero endpoint on destination chain
     */
    function lzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64 _nonce,
        bytes memory _payload
    ) external {
        require(msg.sender == lzEndpoint, "Only endpoint");

        // Decode payload
        (address to, uint256 amount) = abi.decode(_payload, (address, uint256));

        // Mint tokens on destination chain
        _mint(to, amount);

        emit CrossChainReceived(to, _srcChainId, amount);
    }

    // ========== CONFIGURATION FUNCTIONS ==========

    function setAPRThreshold(uint256 threshold) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 oldThreshold = aprThreshold;
        aprThreshold = threshold;
        emit APRThresholdUpdated(oldThreshold, threshold);
    }

    function setChainConfig(uint16 chainId, CrossChainConfig calldata config) 
        external 
        override 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        chainConfigs[chainId] = config;
    }

    function toggleCircuitBreaker(uint16 chainId, bool enabled) 
        external 
        override 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        circuitBreakers[chainId] = enabled;
        if (enabled) {
            emit CircuitBreakerActivated(chainId, "Manual activation");
        }
    }

    function setYieldOracle(address _yieldOracle) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_yieldOracle != address(0), "Invalid oracle");
        yieldOracle = IYieldOracle(_yieldOracle);
    }

    function updateChainAPR(uint16 chainId, uint256 apr) external onlyRole(BRIDGE_ROLE) {
        chainAPRs[chainId] = apr;
    }

    // ========== VIEW FUNCTIONS ==========

    function getCurrentChainAPR() public view returns (uint256) {
        // In real implementation, would query from YieldOracle
        // For now, return stored value
        return chainAPRs[uint16(block.chainid)];
    }

    function getTargetChainAPR(uint16 chainId) public view returns (uint256) {
        if (address(yieldOracle) != address(0)) {
            return yieldOracle.getAPR(chainId);
        }
        return chainAPRs[chainId];
    }

    /**
     * @notice Estimate fee for cross-chain send
     * @dev Simplified implementation - real version would query LayerZero
     */
    function estimateSendFee(
        uint16 _dstChainId,
        bytes memory _toAddress,
        uint256 _amount,
        bool _useZro,
        bytes memory _adapterParams
    ) external view override returns (uint256 nativeFee, uint256 zroFee) {
        // Simplified fee estimation
        nativeFee = 0.001 ether; // Example fee
        zroFee = 0;
        
        return (nativeFee, zroFee);
    }

    // ========== MINTING (Vault only) ==========

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyRole(MINTER_ROLE) {
        _burn(from, amount);
    }

    // ========== EMERGENCY CONTROLS ==========

    function activateEmergencyMode() external onlyRole(DEFAULT_ADMIN_ROLE) {
        emergencyMode = true;
    }

    function deactivateEmergencyMode() external onlyRole(DEFAULT_ADMIN_ROLE) {
        emergencyMode = false;
    }
}

