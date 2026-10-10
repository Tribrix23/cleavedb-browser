import { TutorialPageShell } from "@/components/ui/tutorial-page-shell";
import { TutorialCodeBlock } from "@/components/ui/tutorial-code-block";

export default function SubscribeBucketPage() {
  return (
    <TutorialPageShell
      sectionTitle="Subscribe to a bucket"
      previousHref="/tutorial/realtime"
      previousLabel="Overview"
      nextHref="/tutorial/realtime/subscribe-document"
      nextLabel="Subscribe to a document"
    >
      <p className="mb-6 leading-relaxed text-zinc-600">
        Subscribing to an entire bucket allows your application to receive live streams of every document insertion (<code>POUR</code>), field modification (<code>CHANGE</code>), and removal (<code>DRAIN</code>) happening within that namespace.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Subscription syntax</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        Over a WebSocket connection, issue the <code>LISTEN TO</code> command followed by the target bucket:
      </p>
      <TutorialCodeBlock label="Subscribe to a bucket">{`LISTEN TO chat`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        The server registers your WebSocket client under the internal channel <code>bucket:chat</code> and begins streaming data events in real time.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Connecting over WebSockets</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        You can connect directly from JavaScript, Python, or command-line utilities like <code>wscat</code>:
      </p>
      <TutorialCodeBlock label="Terminal connection with wscat">{`# 1. Connect to the WebSocket port (default 8301)
wscat -c ws://127.0.0.1:8301

# 2. Authenticate session credentials
> {"action": "authenticate", "username": "david", "password": "secret"}
< [{"status": "ok", "message": "Authenticated as david"}]

# 3. Open bucket subscription
> LISTEN TO chat
< [{"status": "listen", "target": "bucket:chat"}]`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        Your client remains open and awaits real-time push events from the database.
      </p>

      <h3 className="mb-3 text-lg font-semibold text-zinc-900">Real-time broadcast in action</h3>
      <p className="mb-4 leading-relaxed text-zinc-600">
        When any client writes a message into the bucket:
      </p>
      <TutorialCodeBlock label="Mutate data in another connection">{`POUR INTO chat "msg_1" {"user": "Alice", "text": "Welcome to CleaveDB!"}`}</TutorialCodeBlock>
      <p className="mb-4 leading-relaxed text-zinc-600">
        All connected subscribers on <code>chat</code> immediately receive the broadcast payload:
      </p>
      <TutorialCodeBlock label="Pushed event payload">{`{
  "event": "POUR",
  "bucket": "chat",
  "id": "msg_1",
  "data": {
    "user": "Alice",
    "text": "Welcome to CleaveDB!"
  },
  "timestamp": 1728562400
}`}</TutorialCodeBlock>
      <p className="mb-8 leading-relaxed text-zinc-600">
        No external polling loops or cache invalidation pings are necessary; the UI updates instantly.
      </p>

      <aside className="rounded-lg border border-blue-100 bg-blue-50/70 p-5 leading-relaxed text-zinc-700">
        <h3 className="mb-2 font-semibold text-zinc-900">Full lifecycle coverage</h3>
        <p>
          The stream emits events for all write operations: <code>POUR</code> (new documents), <code>CHANGE</code> (updated fields), and <code>DRAIN</code> (recycled documents), giving your client complete synchronization with the database state.
        </p>
      </aside>
    </TutorialPageShell>
  );
}
