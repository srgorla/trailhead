export function readTaskCreated(event, { origins, channel }) {
  if (
    !event.source ||
    !origins.includes(event.origin) ||
    typeof event.data !== "string" ||
    event.data.length > 2048
  )
    return null;
  try {
    const data = JSON.parse(event.data);
    if (
      data?.type !== "simple-out.task-created.v1" ||
      data.channel !== channel ||
      typeof data.taskId !== "string" ||
      !/^00T[a-zA-Z0-9]{12}(?:[a-zA-Z0-9]{3})?$/.test(data.taskId) ||
      typeof data.subject !== "string" ||
      data.subject.length > 255
    )
      return null;
    return { taskId: data.taskId, subject: data.subject };
  } catch {
    return null;
  }
}
