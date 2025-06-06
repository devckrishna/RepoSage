"use client";

import useProject from "@/hooks/use-project";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommitLog from "./commit-section";

const DashboardPage = () => {
  const { project } = useProject();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <div className="bg-primary w-fit rounded-md px-4 py-3">
          <div className="flex items-center">
            <Github className="size-6 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is linked to
                <Link
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubUrl}
                  <ExternalLink className="ml-1 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>

        <div className="flex items-center gap-4">
          Team Members Invite Button Archive Button
        </div>
      </div>
      <CommitLog />
    </div>
  );
};

export default DashboardPage;
