import { createFileRoute } from "@tanstack/react-router";
import { LeaguePage, leagueHead } from "@/components/site/LeaguePage";

export const Route = createFileRoute("/girls/ncl")({
  head: leagueHead(
    "Girls NCL Team | Neighbourhood Academy",
    "Roster, fixtures, results and standings for the Neighbourhood Academy Girls NCL squad.",
  ),
  component: () => <LeaguePage slug="girls-ncl" />,
});
