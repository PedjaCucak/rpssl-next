import type { ChoiceDto, GameResultDto } from '@/types/dto';

async function j<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  async getChoices(): Promise<ChoiceDto[]> {
    return j(await fetch('/api/choices', { cache: 'no-store' }));
  },
  async getScoreboard() {
    return j<GameResultDto[]>(await fetch('/api/scoreboard', { cache: 'no-store' }));
  },
  async resetScoreboard() {
    await fetch('/api/scoreboard', { method: 'DELETE' });
  },
  async play(player: number) {
    return j<GameResultDto>(
      await fetch('/api/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player }),
      })
    );
  },
};
