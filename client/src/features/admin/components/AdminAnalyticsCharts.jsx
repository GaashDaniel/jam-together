import React from "react";
import { Grid } from "@mui/material";
import useTheme from "../../../shared/hooks/useTheme";
import {
  MostLikedEventsChart,
  GenrePopularityChart,
  TopActiveUsersChart,
  RequestOverviewChart,
  MostRequestedEventsChart,
  MostActiveRequestersChart,
} from "./Analytics";
export default function AdminAnalyticsCharts({ analytics }) {
  const { theme, isDark } = useTheme();
  const {
    mostLikedEvents = [],
    genrePopularity = [],
    userEngagement = [],
    requestStats = [],
    mostRequestedEvents = [],
    requestResponseTimes = [],
    mostActiveRequesters = [],
  } = analytics;
  const paperSx = React.useMemo(
    () => ({
      p: 3,
      background: isDark
        ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
        : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
      border: `1px solid ${theme.palette.divider}`,
    }),
    [isDark, theme]
  );
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <MostLikedEventsChart
          mostLikedEvents={mostLikedEvents}
          paperSx={paperSx}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <GenrePopularityChart
          genrePopularity={genrePopularity}
          paperSx={paperSx}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TopActiveUsersChart
          userEngagement={userEngagement}
          paperSx={paperSx}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <RequestOverviewChart
          requestStats={requestStats}
          requestResponseTimes={requestResponseTimes}
          paperSx={paperSx}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <MostRequestedEventsChart
          mostRequestedEvents={mostRequestedEvents}
          paperSx={paperSx}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <MostActiveRequestersChart
          mostActiveRequesters={mostActiveRequesters}
          paperSx={paperSx}
        />
      </Grid>
    </Grid>
  );
}