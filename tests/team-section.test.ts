import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { TEAM_MEMBERS } from "../src/data/team";

test("Team Section - exactly three team members defined", () => {
  assert.equal(TEAM_MEMBERS.length, 3);
});

test("Team Section - members are ordered correctly with Muhammad Akif Naveed first", () => {
  assert.equal(TEAM_MEMBERS[0].name, "Muhammad Akif Naveed");
  assert.equal(TEAM_MEMBERS[0].role, "Full-Stack AI Engineer");

  assert.equal(TEAM_MEMBERS[1].name, "Hamza Ali");
  assert.equal(TEAM_MEMBERS[1].role, "Full-Stack Engineer");

  assert.equal(TEAM_MEMBERS[2].name, "Umer Hayat");
  assert.equal(TEAM_MEMBERS[2].role, "Security & Quality Assurance Engineer");
});

test("Team Section - all member images exist locally in public/images", () => {
  for (const member of TEAM_MEMBERS) {
    assert.ok(member.imageUrl.startsWith("/images/"));
    const relativePath = member.imageUrl.replace(/^\//, "");
    const fullPath = path.resolve(process.cwd(), "public", relativePath.replace(/^images\//, "images/"));
    assert.ok(
      fs.existsSync(fullPath),
      `Expected image to exist at ${fullPath}`
    );
  }
});

test("Team Section - all members have valid GitHub and LinkedIn profiles and no Twitter/YouTube", () => {
  for (const member of TEAM_MEMBERS) {
    assert.ok(member.githubUrl.startsWith("https://github.com/"));
    assert.ok(member.linkedinUrl.startsWith("https://www.linkedin.com/"));
    assert.equal("twitterUrl" in member, false);
    assert.equal("youtubeUrl" in member, false);
  }
});

test("Team Section - member descriptions are professional, non-empty, and distinct", () => {
  const descriptions = new Set<string>();
  for (const member of TEAM_MEMBERS) {
    assert.ok(member.description.length > 50);
    assert.ok(!descriptions.has(member.description));
    descriptions.add(member.description);
  }
});
