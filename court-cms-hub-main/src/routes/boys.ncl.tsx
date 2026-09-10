import { createFileRoute } from "@tanstack/react-router";
import { LeaguePage, leagueHead } from "@/components/site/LeaguePage";

export const Route = createFileRoute("/boys/ncl")({
  head: leagueHead(
    "Boys NCL Team | Neighbourhood Academy",
    "Roster, fixtures, results and standings for the Neighbourhood Academy Boys NCL squad.",
  ),
  component: () => <LeaguePage slug="boys-ncl" />,
});
