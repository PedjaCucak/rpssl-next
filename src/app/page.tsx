'use client';

import { useCallback, useEffect, useState } from 'react';
import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { useLoadChoices } from '@/hooks/useLoadChoices';
import { GameChoiceGrid } from '@/components/GameChoiceGrid';
import { Scoreboard } from '@/components/Scoreboard';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { playRound } from '@/store/slices/gameSlice';
import {
  selectChoiceNameById,
  selectChoicesStatus,
  selectLastRound,
  selectPlayStatus,
} from '@/store/selectors/gameSelectors';
import { WinnerOverlay } from '@/components/WinnerOverlay';
import { OverlayPhase } from '@/types/ui';
import { detectOutcome } from '@/lib/gameOutcome';
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler';

export default function Home() {
  const { loading } = useLoadChoices({ auto: true });
  const dispatch = useAppDispatch();
  const handleApiError = useApiErrorHandler();

  const lastRound = useAppSelector(selectLastRound);
  const playStatus = useAppSelector(selectPlayStatus);
  const getNameById = useAppSelector(selectChoiceNameById);
  const choicesStatus = useAppSelector(selectChoicesStatus);

  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<OverlayPhase>('pending');
  const [pickedId, setPickedId] = useState<number | null>(null);

  const isChoicesLoading = loading || choicesStatus === 'loading';

  const handlePick = useCallback(
    async (id: number) => {
      setPickedId(id);
      setPhase('pending');
      setOpen(true);
      try {
        await dispatch(playRound(id)).unwrap();
      } catch (err) {
        handleApiError(err);
      }
    },
    [dispatch, handleApiError]
  );

  useEffect(() => {
    if (!open) return;
    if (playStatus === 'success' && lastRound) {
      setPhase('result');
      const t = setTimeout(() => setOpen(false), 1200);
      return () => clearTimeout(t);
    }
    if (playStatus === 'error') setOpen(false);
  }, [open, playStatus, lastRound]);

  const outcome = detectOutcome(lastRound?.results);
  const playerName =
    phase === 'pending'
      ? pickedId != null
        ? getNameById(pickedId)
        : ''
      : lastRound
        ? getNameById(lastRound.player)
        : '';
  const computerName =
    phase === 'result' && lastRound
      ? getNameById(lastRound.computer)
      : undefined;

  return (
    <Container maxWidth="md" sx={{ py: 4, height: '100%' }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Rock • Paper • Scissors • Lizard • Spock
        </Typography>

        {isChoicesLoading ? (
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={160} />
            <Skeleton variant="rounded" height={280} />
          </Stack>
        ) : (
          <>
            <GameChoiceGrid onPick={handlePick} />
            <Scoreboard />
          </>
        )}
      </Stack>

      <WinnerOverlay
        open={open}
        onClose={() => setOpen(false)}
        phase={phase}
        outcome={outcome}
        playerName={playerName}
        computerName={computerName}
      />
    </Container>
  );
}
