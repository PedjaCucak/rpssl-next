'use client';
import * as React from 'react';
import {
  Box,
  Modal,
  Fade,
  Zoom,
  Stack,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { emojiFor } from '@/lib/gameIcons';
import { Outcome, OverlayPhase } from '@/types/ui';

export interface WinnerOverlayProps {
  open: boolean;
  onClose: () => void;
  phase: OverlayPhase;
  outcome: Outcome;
  playerName: string;
  computerName?: string;
}

export const WinnerOverlay: React.FC<WinnerOverlayProps> = ({
  open,
  onClose,
  phase,
  outcome,
  playerName,
  computerName,
}) => {
  const title =
    phase === 'pending'
      ? 'Computer is choosing…'
      : outcome === 'player'
        ? 'You Win!'
        : outcome === 'computer'
          ? 'You Lose'
          : 'Tie Game';

  const bigIcon = () => {
    if (phase === 'pending') return emojiFor(playerName);
    if (outcome === 'player') return emojiFor(playerName);
    if (outcome === 'computer') return emojiFor(computerName ?? '');
    return '🤝';
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="winner-title"
      closeAfterTransition
    >
      <Fade in={open} timeout={{ enter: 150, exit: 120 }}>
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            p: 2,
          }}
        >
          <Zoom in={open} timeout={{ enter: 150, exit: 120 }}>
            <Paper
              elevation={6}
              sx={{
                px: 6,
                py: 5,
                borderRadius: 4,
                textAlign: 'center',
                minWidth: 320,
              }}
            >
              <Stack spacing={2} alignItems="center">
                {phase === 'result' ? (
                  <EmojiEventsIcon sx={{ fontSize: 40 }} />
                ) : (
                  <CircularProgress />
                )}

                <Typography id="winner-title" variant="h4" fontWeight={800}>
                  {title}
                </Typography>

                <Typography variant="h1" lineHeight={1}>
                  {bigIcon()}
                </Typography>

                {phase === 'pending' ? (
                  <Typography variant="body2" color="text.secondary">
                    Your move:{' '}
                    <strong style={{ textTransform: 'capitalize' }}>
                      {playerName}
                    </strong>
                  </Typography>
                ) : outcome === 'tie' ? (
                  <Typography variant="body2" color="text.secondary">
                    Both chose wisely (or not)…
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    You:{' '}
                    <strong style={{ textTransform: 'capitalize' }}>
                      {playerName}
                    </strong>{' '}
                    vs Computer:&nbsp;
                    <strong style={{ textTransform: 'capitalize' }}>
                      {computerName ?? ''}
                    </strong>
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Zoom>
        </Box>
      </Fade>
    </Modal>
  );
};
