import type { ChoiceDto, GameResultDto, OkDto } from '@/types/dto';
import { API } from './http';

export const api = {
  async getChoices(): Promise<ChoiceDto[]> {
    const res = await API.get<ChoiceDto[]>('/choices');
    return res.data;
  },
  async getScoreboard(): Promise<GameResultDto[]> {
    const res = await API.get<GameResultDto[]>('/scoreboard');
    return res.data;
  },
  async resetScoreboard(): Promise<OkDto> {
    const res = await API.delete<OkDto>('/scoreboard');
    return res.data;
  },
  async play(player: number): Promise<GameResultDto> {
    const res = await API.post<GameResultDto>('/play', { player });
    return res.data;
  },
};
