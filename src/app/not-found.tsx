import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  const src = '/icon-192.png';
  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: '100%', display: 'grid', placeItems: 'center' }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Box
          component="img"
          src={src}
          alt="404 Not Found"
          sx={{ userSelect: 'none', pointerEvents: 'none' }}
        />
        <Typography variant="h4" fontWeight={800}>
          404 Not Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          sx={{ textTransform: 'none' }}
        >
          Go Home
        </Button>
      </Stack>
    </Container>
  );
}
