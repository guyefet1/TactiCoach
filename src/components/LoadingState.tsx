interface LoadingStateProps {
  message: string
}

function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="loading-state" role="status">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

export default LoadingState
