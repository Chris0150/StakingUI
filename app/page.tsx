'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import STAKING_CONTRACT_ABI from './abi/abi.json';
import { Container, Content, Section, Title, ArrowsContainer, Arrow, InfoContainer,
         InfoText, Loader, Input, StakeButton, UnstakeButton, SuccessMessage, 
         GlobalStyle} from './page.styles';

const StakingPage: React.FC = () => {
  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [tcu29Price] = useState<number>(1.17); 
  const [tcu29InPool] = useState<number>(9370);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stakedBalance, setStakedBalance] = useState<number>(0);
  const [stakingAmount, setStakingAmount] = useState<string>('');
  const [unstakingAmount, setUnstakingAmount] = useState<string>('');
  const [availableBalance, setAvailableBalance] = useState<number>(100); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const STAKING_CONTRACT_ADDRESS = '0x...';

  useEffect(() => {
    if (!isConnected) return;
    setStakedBalance(0);
  }, [isConnected]);

  const balanceData = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'getStakedBalance',
  });

  useEffect(() => {
    if (balanceData.data) setStakedBalance(parseFloat(balanceData.data.toString()));
  }, [balanceData.data]);

  const handleStake = () => {
    if (!stakingAmount) return;
    const amountToStake = parseFloat(stakingAmount);

    if (amountToStake > availableBalance) {
      alert('Insufficient balance to stake this amount.');
      return;
    }

    setIsLoading(true);
    setSuccessMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setAvailableBalance((prev) => prev - amountToStake); 
      setStakedBalance((prev) => prev + amountToStake); 
      writeContract({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: 'stake',
        args: [BigInt(stakingAmount)],
      });
      setSuccessMessage(`Staked ${amountToStake} TCu29 successfully!`);
      setStakingAmount('0')
      setUnstakingAmount('0')
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 3000);
  };

  const handleUnstake = () => {
    if (!unstakingAmount) return;
    const amountToUnstake = parseFloat(unstakingAmount);

    if (amountToUnstake > stakedBalance) {
      alert('Insufficient staked balance to unstake this amount.');
      return;
    }

    setIsLoading(true);
    setSuccessMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setAvailableBalance((prev) => prev + amountToUnstake); 
      setStakedBalance((prev) => prev - amountToUnstake);
      writeContract({
        abi: STAKING_CONTRACT_ABI,
        address: STAKING_CONTRACT_ADDRESS,
        functionName: 'unstake',
        args: [BigInt(unstakingAmount)],
      });
      setSuccessMessage(`Unstaked ${amountToUnstake} xTCu29 successfully!`);
      setStakingAmount('0') 
      setUnstakingAmount('0')
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 3000);
  };

  return (
    <>
    <GlobalStyle />
    <Container>
      <Title>Staking DApp</Title>
      <ConnectButton />

      {isConnected ? (
        <Content>
          {/* Staking Section */}
          <Section>
            <Title>Stake</Title>
            <InfoText>Your TCu29: {availableBalance.toFixed(2)} (${(availableBalance * tcu29Price).toFixed(2)})</InfoText>
            <Input
              min='0'
              type="number"
              value={stakingAmount}
              placeholder="Enter Amount"
              onChange={(e) => setStakingAmount(e.target.value)}
              isLoading={isLoading}
            />
            <StakeButton onClick={handleStake} disabled={isLoading} isLoading={isLoading}>
              {isLoading ? 'Processing...' : 'Stake'}
            </StakeButton>
          </Section>

          <ArrowsContainer>
            {isLoading && <Loader />}
            <Arrow>⬅️</Arrow>
            <Arrow>➡️</Arrow>
          </ArrowsContainer>

          {/* Unstaking Section */}
          <Section>
            <Title>Unstake</Title>
            <InfoText>Your xTCu29: {stakedBalance.toFixed(2)} (${(stakedBalance * tcu29Price).toFixed(2)})</InfoText>
            <Input
              min='0'
              type="number"
              value={unstakingAmount}
              placeholder="Enter Amount"
              onChange={(e) => setUnstakingAmount(e.target.value)}
              isLoading={isLoading}
            />
            <UnstakeButton onClick={handleUnstake} disabled={isLoading} isLoading={isLoading}>
              {isLoading ? 'Processing...' : 'Unstake'}
            </UnstakeButton>
          </Section>
        </Content>
      ) : null}

    {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      {isConnected && (
        <InfoContainer>
          <InfoText>TCu29 price: $1.17</InfoText>
          <InfoText>TCu29 in Pool: {tcu29InPool} ($4,669.155)</InfoText>
        </InfoContainer>
      )}
    </Container>
    </>
  );
};

export default StakingPage;
