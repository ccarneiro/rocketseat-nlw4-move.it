interface ExperienceBarProps {
  start: number;
  current: number;
  end: number;
}

export function ExperienceBar(props: ExperienceBarProps) {
  const current = props.current <= props.end ? props.current : props.end;
  const percent = ((current - props.start) * 100) / (props.end - props.start);
  return (
    <header className="experience-bar">
      <span>{props.start} xp</span>
      <div>
        <div style={{ width: `${percent}%` }}></div>
        <span className="current-experience" style={{ left: `${percent}%` }}>
          {props.current} xp
        </span>
      </div>
      <span>{props.end} xp</span>
    </header>
  );
}
