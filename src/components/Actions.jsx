import { useGameProvider } from "../hooks/useGameProvider"

const Actions = () => {
  const {
    currentRoom,
    actions,
    currentAction,
    taskPercentage,
    handleCancelAction,
    handleLeaveAction,
    handleSelectAction,
  } = useGameProvider()

  const Active = ({ action }) => (
    <>
      <span className="active-action">{action}</span>
      &nbsp;
      <span
        className="active-cancel"
        onClick={() => handleCancelAction()}
      >
        [x]
      </span>
    </>
  )

  const Inactive = ({ action }) => (
    <span
      className="inactive-action"
      onClick={() => {
        handleSelectAction(action)
      }}
    >
      {action}
    </span>
  )

  const Leave = () => (
    <span
      className={taskPercentage === 100 ? "glow" : "inactive-action"}
      onClick={() => handleLeaveAction()}
    >
      Leave?
    </span>
  )

  return (
    <div id="actions">
      <h2>Actions</h2>
      <hr />
      <ul>
        {actions.map((action) => (
          <li key={action}>
            {action === currentAction ? (
              <Active action={action} />
            ) : (
              <Inactive action={action} />
            )}
          </li>
        ))}
        {currentRoom.key !== "epilogue" ? (
          <li>
            <Leave />
          </li>
        ) : null}
      </ul>
    </div>
  )
}

export default Actions
