import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export const aiSummariseCommit = async (diff: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4", // or "gpt-3.5-turbo" if you prefer
    messages: [
      {
        role: "system",
        content: `You are an expert programmer, and you are trying to summarize a git diff.
Reminders about the git diff format:
For every file, there are a few metadata lines, like (for example):

\`\`\`
diff --git a/lib/index.js b/lib/index.js
index aadf891..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js
\`\`\`

This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
Then there is a specifier of the lines that were modified.
A line starting with \`+\` means it was added.
A line that starting with \`-\` means that line was deleted.
A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.
It is not part of the diff.

EXAMPLE SUMMARY COMMENTS:
\`\`\`
- Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts], [packages/server/constants.ts]
- Fixed a typo in the github action name [.github/workflows/ai-commit-summarizer.yml]
- Moved the \`octokit\` initialization to a separate file [src/octokit.ts], [src/index.ts]
- Added an OpenAI API for completions [packages/utils/apis/openai.ts]
- Lowered numeric tolerance for test files
\`\`\`

Most commits will have less comments than this examples list.
The last few comments do not include the file names.
In those, there were more than two relevant files in the hypothetical commit.
Do not include parts of the example in your summary.
It is given only as an example of appropriate comments.`,
      },
      {
        role: "user",
        content: `Please summarize the following diff file:\n\n${diff}`,
      },
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content?.trim() ?? ""
}
