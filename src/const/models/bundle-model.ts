import { z } from "zod";
import type { BundleScheme } from "#src/const/schemes/bundle-scheme.js";

export type BundleModel = z.infer<typeof BundleScheme>;
