import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const DICTIONARIES_DIR = path.join(process.cwd(), "src", "app", "[lang]", "dictionaries");
const LOCALES = [
  "en",
  "ar",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "nl",
  "tr",
  "ur",
  "hi",
  "zh-CN",
  "ja",
  "ko",
];

test("Services Configuration - all 14 dictionaries define exactly 6 services", () => {
  for (const locale of LOCALES) {
    const filePath = path.join(DICTIONARIES_DIR, `${locale}.json`);
    assert.ok(fs.existsSync(filePath), `Dictionary file for ${locale} must exist`);

    const dict = JSON.parse(fs.readFileSync(filePath, "utf8"));
    assert.ok(dict.services, `Dictionary for ${locale} must have services object`);
    assert.ok(Array.isArray(dict.services.items), `Dictionary for ${locale} must have services.items array`);
    assert.equal(
      dict.services.items.length,
      6,
      `Dictionary for ${locale} must contain exactly 6 services, got ${dict.services.items.length}`
    );

    // Verify all 6 items have required fields
    dict.services.items.forEach((item: any, idx: number) => {
      const expectedId = `0${idx + 1}`;
      assert.equal(item.id, expectedId, `Service at index ${idx} in ${locale} must have id ${expectedId}`);
      assert.ok(typeof item.title === "string" && item.title.trim().length > 0, `Service ${item.id} in ${locale} must have non-empty title`);
      assert.ok(typeof item.description === "string" && item.description.trim().length > 0, `Service ${item.id} in ${locale} must have non-empty description`);
      assert.ok(Array.isArray(item.tags) && item.tags.length >= 3, `Service ${item.id} in ${locale} must have at least 3 tags`);
    });

    // Verify 6th service is Business Development
    const service6 = dict.services.items[5];
    assert.equal(service6.id, "06");
    assert.ok(service6.title.length > 0);
    assert.ok(service6.description.length > 20);

    // Verify whoWeAre stats shows 6 service areas
    assert.ok(dict.whoWeAre && Array.isArray(dict.whoWeAre.stats));
    assert.ok(
      dict.whoWeAre.stats[0].label.includes("6"),
      `Dictionary for ${locale} whoWeAre.stats[0].label must mention 6, got ${dict.whoWeAre.stats[0].label}`
    );
  }
});
