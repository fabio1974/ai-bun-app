export class ConversationRepository {
    private conversations = new Map<string, string>();

    get(conversationId: string) {
        return this.conversations.get(conversationId);
    }

    set(conversationId: string, responseId: string) {
        this.conversations.set(conversationId, responseId);
    }
}
