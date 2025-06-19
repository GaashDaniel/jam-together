import React from "react";
import { Paper, Typography, Stack, Box, LinearProgress } from "@mui/material";
const GenrePopularityChart = React.memo(({ genrePopularity, paperSx }) => (
  <Paper sx={paperSx}>
    <Typography variant="h6" gutterBottom>
      Genre Popularity
    </Typography>
    <Stack spacing={2}>
      {genrePopularity.slice(0, 8).map((genre) => (
        <Box key={genre._id}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
              {genre._id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {genre.count} events • {genre.totalLikes} likes
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(genre.count / genrePopularity[0]?.count) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      ))}
    </Stack>
  </Paper>
));
GenrePopularityChart.displayName = "GenrePopularityChart";
export default GenrePopularityChart;