/** The cosmic continuation follows the final Code session step, not just the map reveal. */
export function canContinueToCosmos(step: number): boolean {
  return step >= 9;
}
