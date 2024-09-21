import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count( {
    where: {
      status: "OPEN"
    }
  } )
  const closed = await prisma.issue.count( {
    where: {
      status: "CLOSED"
    }
  } )
  const inProgress = await prisma.issue.count( {
    where: {
      status: "IN_PROGRESS"
    }
  } )
  const issuesCount = { open, closed, inProgress }

  return (
    <Grid columns={ { initial: '1', md: "2" } } gap='5'>
      <Flex direction="column" gap='5'>
        <IssueSummary issuesCount={ issuesCount } />
        <IssueChart issuesCount={ issuesCount } />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issuse",
  keywords: "issue tracker, dashboard, project management, bug tracking, task summary",
  openGraph: {
    title: "Issue Tracker - Dashboard",
    description: "View a summary of project issues",
    type: "website",
  },
}
