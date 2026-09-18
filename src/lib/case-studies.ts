import type { ComponentType } from "react";
import { DesignSystemKnowledgePlatformCase } from "@/components/design-system-knowledge-platform-case";
import { flagshipProjectSlug } from "@/lib/flagship-project";

/**
 * Slugs that render a bespoke case-study component instead of the generic
 * Markdown project template. Add a new entry here (plus a matching static
 * ContentItem in flagship-project.ts) when a new case study ships.
 */
export const caseStudyRegistry: Record<string, ComponentType> = {
  [flagshipProjectSlug]: DesignSystemKnowledgePlatformCase,
};
