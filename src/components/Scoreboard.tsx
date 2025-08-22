"use client";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import {
  resetScoreboard,
  selectChoiceNameById,
  selectRecent,
} from "@/store/slices/gameSlice";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { emojiFor } from "@/lib/gameIcons";
import { outcomeColor } from "@/lib/gameOutcome";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";

export const Scoreboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleApiError = useApiErrorHandler();
  const recent = useAppSelector(selectRecent);
  const getNameById = useAppSelector(selectChoiceNameById);

  const isResetDisabled = recent.length === 0;

  const handleResetScoreboard = async () => {
    try {
      await dispatch(resetScoreboard());
    } catch (err) {
      handleApiError(err);
    }
  };

  const ItemChip: React.FC<{ id: number }> = ({ id }) => {
    const name = getNameById(id);
    return (
      <Chip
        size="small"
        label={
          <Stack direction="row" spacing={0.75} alignItems="center">
            <span style={{ fontSize: 16, lineHeight: 1 }}>
              {emojiFor(name)}
            </span>
            <span style={{ textTransform: "capitalize" }}>{name}</span>
          </Stack>
        }
        variant="outlined"
      />
    );
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6">Scoreboard</Typography>
          <Tooltip title="Reset scoreboard">
            <span>
              <IconButton
                aria-label="reset scoreboard"
                size="small"
                onClick={handleResetScoreboard}
                disabled={isResetDisabled}
              >
                <RestartAltIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        {recent.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No games yet — pick a move!
          </Typography>
        ) : (
          <List dense disablePadding>
            {recent.map((r, idx) => (
              <ListItem key={idx} divider>
                <ListItemText
                  primary={
                    <Stack
                      direction="row"
                      spacing={1.25}
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Typography component="span" fontWeight={600}>
                        You:
                      </Typography>
                      <ItemChip id={r.player} />
                      <Typography component="span" sx={{ mx: 0.5 }}>
                        vs
                      </Typography>
                      <Typography component="span" fontWeight={600}>
                        Computer:
                      </Typography>
                      <ItemChip id={r.computer} />
                    </Stack>
                  }
                  secondary={
                    <Typography sx={{ color: outcomeColor(r.results) }}>
                      {r.results}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={handleResetScoreboard}
          disabled={isResetDisabled}
        >
          Reset
        </Button>
      </CardActions>
    </Card>
  );
};
