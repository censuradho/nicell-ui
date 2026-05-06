
export function RangeProgress ({ percentage, color }: { percentage: number; color?: string }) {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-outline">
      <div
        className={`h-full ${color ?? 'bg-primary'}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}