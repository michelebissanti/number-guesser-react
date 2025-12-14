import { Trophy, Repeat } from 'lucide-react';
import dayjs from 'dayjs';
import './GoalCard.css';

function GoalCard(props) {
    const { goal } = props;
    const cardClass = goal.achieved
        ? "card h-100 achievement-card shadow achieved-goal-card"
        : "card h-100 achievement-card shadow-sm hover:shadow-md transition-shadow duration-300";

    return (
        <div className={cardClass}>
            <div className="card-body position-relative p-4">
                {/* Achievement Count Badge */}
                {goal.repeatable && goal.achieved && (
                    <div className="position-absolute top-0 end-0 mt-3 me-3">
                        <span className="badge bg-primary rounded-pill d-flex align-items-center gap-1">
                            <Trophy size={14} />
                            <span>×{goal.timeAchieved}</span>
                        </span>
                    </div>
                )}

                {/* Repeatable Indicator */}
                {goal.repeatable && !goal.achieved && (
                    <div className="position-absolute top-0 end-0 mt-3 me-3">
                        <span className="badge bg-secondary bg-opacity-75 rounded-pill d-flex align-items-center gap-1"
                            title="Repeatable Achievement">
                            <Repeat size={14} />
                            <span>Ripetibile</span>
                        </span>
                    </div>
                )}

                {/* Card Header */}
                <div className="d-flex align-items-center mb-3">
                    <div className="achievement-icon rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                        <span className="text-primary">{goal.icon}</span>
                    </div>
                    <h5 className="card-title mb-0 fw-bold">{goal.name}</h5>
                </div>

                {/* Condition Section */}
                <div className="mb-3">
                    <h6 className="text-muted fw-medium small text-uppercase tracking-wider">
                        Condizione
                    </h6>
                    <p className="mb-0 fw-medium">{goal.condition}</p>
                </div>

                {/* Description Section */}
                <div className="mb-3">
                    <p className="card-text text-secondary">
                        {goal.description}
                    </p>
                </div>

                {/* Achievement Date */}
                {goal.achieved && (
                    <div className="mt-auto pt-2 border-top">
                        <small className="text-muted d-flex align-items-center gap-2">
                            <Trophy size={14} className="text-success" />
                            Sbloccato il {dayjs(goal.achievedAt).format('D/MM/YYYY')}
                        </small>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GoalCard;