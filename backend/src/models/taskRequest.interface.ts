export interface TaskRequest {
    taskRequestId: string;
    title: string;
    description: string;
    fromTeamId: string;
    toTeamId: string;
    project?: string;
    createdBy?: string;
    deadlines?: string[];
    status?: string;
    rejectionReason?: string;
    escalationCount: number;
}
