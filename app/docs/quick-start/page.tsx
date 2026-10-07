import React from "react";
import Link from "next/link";

export default function DocsQuickStartPage() {
  return (
    <>
      <div className="mb-4 text-sm font-medium text-blue-600 tracking-wide uppercase">Getting Started</div>
      <h1 className="text-4xl font-bold text-zinc-900 mb-6 tracking-tight">Quick Start</h1>
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        CleaveDB operates over a <strong>TCP Protocol (port 8300)</strong>, a <strong>WebSocket Protocol (port 8301)</strong>, and an <strong>HTTP REST API (port 8302)</strong>. All client connections must authenticate with a valid username and password before executing CleaveQL queries.
      </p>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Node.js (WebSocket)</h2>
        <p className="text-zinc-600 mb-6">
          The WebSocket protocol is ideal for long-lived, stateful connections and enables real-time Pub/Sub features like <code>LISTEN TO bucket</code>.
        </p>
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">index.js</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-purple-400">const</span> WebSocket = <span className="text-blue-400">require</span>(<span className="text-emerald-300">'ws'</span>);<br/><br/>
<span className="text-purple-400">const</span> ws = <span className="text-purple-400">new</span> WebSocket(<span className="text-emerald-300">'ws://127.0.0.1:8301'</span>);<br/><br/>
ws.<span className="text-blue-400">on</span>(<span className="text-emerald-300">'open'</span>, <span className="text-purple-400">function</span> <span className="text-blue-400">open</span>() {'{'}<br/>
&nbsp;&nbsp;<span className="text-zinc-500">// 1. Authenticate</span><br/>
&nbsp;&nbsp;ws.<span className="text-blue-400">send</span>(<span className="text-amber-400">JSON</span>.<span className="text-blue-400">stringify</span>({'{'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-400">action:</span> <span className="text-emerald-300">'authenticate'</span>, <br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-400">username:</span> <span className="text-emerald-300">'david'</span>, <br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-400">password:</span> <span className="text-emerald-300">'perez'</span><br/>
&nbsp;&nbsp;{'}'}));<br/>
{'}'});<br/><br/>
<span className="text-purple-400">let</span> authenticated = <span className="text-amber-400">false</span>;<br/><br/>
ws.<span className="text-blue-400">on</span>(<span className="text-emerald-300">'message'</span>, <span className="text-purple-400">function</span> <span className="text-blue-400">incoming</span>(data) {'{'}<br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> response = <span className="text-amber-400">JSON</span>.<span className="text-blue-400">parse</span>(data);<br/>
&nbsp;&nbsp;<br/>
&nbsp;&nbsp;<span className="text-purple-400">if</span> (!authenticated) {'{'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> (response[<span className="text-amber-400">0</span>].status === <span className="text-emerald-300">'ok'</span>) {'{'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;authenticated = <span className="text-amber-400">true</span>;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// 2. Run Queries</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ws.<span className="text-blue-400">send</span>(<span className="text-emerald-300">'FIND users'</span>);<br/>
&nbsp;&nbsp;&nbsp;&nbsp;{'}'} <span className="text-purple-400">else</span> {'{'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-400">console</span>.<span className="text-blue-400">error</span>(<span className="text-emerald-300">'Auth Failed!'</span>);<br/>
&nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
&nbsp;&nbsp;{'}'} <span className="text-purple-400">else</span> {'{'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-emerald-300">'Query Result:'</span>, response);<br/>
&nbsp;&nbsp;{'}'}<br/>
{'}'});
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 mt-16 tracking-tight">Python (WebSockets)</h2>
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">client.py</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-purple-400">import</span> asyncio<br/>
<span className="text-purple-400">import</span> websockets<br/>
<span className="text-purple-400">import</span> json<br/><br/>
<span className="text-purple-400">async def</span> <span className="text-blue-400">connect_ws</span>():<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">async with</span> websockets.connect(<span className="text-emerald-300">"ws://127.0.0.1:8301"</span>) <span className="text-purple-400">as</span> ws:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># 1. Authenticate</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">await</span> ws.send(json.dumps({'{"action": "authenticate", "username": "david", "password": "perez"}'}))<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;auth_res = json.loads(<span className="text-purple-400">await</span> ws.recv())<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> auth_res[<span className="text-amber-400">0</span>].get(<span className="text-emerald-300">"status"</span>) != <span className="text-emerald-300">"ok"</span>:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">print</span>(<span className="text-emerald-300">"Auth failed!"</span>)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># 2. Run Queries</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">await</span> ws.send(<span className="text-emerald-300">{'\'POUR INTO users "bot" {"name": "AI"}\''}</span>)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">print</span>(<span className="text-emerald-300">"WS Query Result:"</span>, <span className="text-purple-400">await</span> ws.recv())<br/><br/>
asyncio.run(connect_ws())
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 mt-16 tracking-tight">Python (Raw TCP)</h2>
        <p className="text-zinc-600 mb-6">
          TCP is the most performant way to interact with the engine. The wire protocol requires newline-delimited requests, with JSON array responses.
        </p>
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">main.py</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-purple-400">import</span> asyncio<br/>
<span className="text-purple-400">import</span> json<br/><br/>
<span className="text-purple-400">async def</span> <span className="text-blue-400">connect_tcp</span>():<br/>
&nbsp;&nbsp;&nbsp;&nbsp;reader, writer = <span className="text-purple-400">await</span> asyncio.open_connection(<span className="text-emerald-300">'127.0.0.1'</span>, <span className="text-amber-400">8300</span>)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># 1. Authenticate</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;auth_payload = {'{"action": "login", "username": "david", "password": "perez"}'}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;writer.write((json.dumps(auth_payload) + <span className="text-emerald-300">"\n"</span>).encode())<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">await</span> writer.drain()<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;response = <span className="text-purple-400">await</span> reader.readline()<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> json.loads(response).get(<span className="text-emerald-300">"status"</span>) != <span className="text-emerald-300">"ok"</span>:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">print</span>(<span className="text-emerald-300">"Auth failed!"</span>)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500"># 2. Run Queries (Newline delimited)</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;writer.write(<span className="text-emerald-300">b'FIND users\n'</span>)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">await</span> writer.drain()<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;query_result = <span className="text-purple-400">await</span> reader.readline()<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">print</span>(<span className="text-emerald-300">"TCP Query Result:"</span>, query_result.decode())<br/><br/>
asyncio.run(connect_tcp())
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 mt-16 tracking-tight">HTTP REST API & cURL</h2>
        <p className="text-zinc-600 mb-6">
          CleaveDB supports zero-dependency REST requests on port <code>8302</code>. You can run raw CleaveQL queries via HTTP POST, or use standard RESTful routing. Authentication is handled via Basic Auth.
        </p>
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">Terminal (REST)</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500"># Run a raw CleaveQL Query</span><br/>
<span className="text-pink-400">curl</span> <span className="text-zinc-400">-X POST</span> http://127.0.0.1:8302/api/v1/query \<br/>
&nbsp;&nbsp;<span className="text-zinc-400">-H</span> <span className="text-emerald-300">"Authorization: Basic ZGF2aWQ6cGVyZXo="</span> \<br/>
&nbsp;&nbsp;<span className="text-zinc-400">-d</span> <span className="text-amber-300">"FIND THE TALLY OF users"</span><br/><br/>

<span className="text-zinc-500"># Standard RESTful CRUD</span><br/>
<span className="text-pink-400">curl</span> <span className="text-zinc-400">-X POST</span> http://127.0.0.1:8302/api/v1/users \<br/>
&nbsp;&nbsp;<span className="text-zinc-400">-H</span> <span className="text-emerald-300">"Authorization: Basic ZGF2aWQ6cGVyZXo="</span> \<br/>
&nbsp;&nbsp;<span className="text-zinc-400">-d</span> <span className="text-amber-300">'{"{"}"name": "API User", "age": 25{"}"}'</span>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 mt-16 tracking-tight">CLI WebSocket Client (wscat)</h2>
        <p className="text-zinc-600 mb-6">
          For real-time Pub/Sub subscriptions (like <code>LISTEN TO users</code>) directly from your terminal, use a websocket tool like <code>wscat</code>:
        </p>
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">Terminal (wscat)</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500"># Install wscat</span><br/>
<span className="text-pink-400">npm</span> install -g wscat<br/><br/>

<span className="text-zinc-500"># Connect and authenticate</span><br/>
<span className="text-pink-400">wscat</span> -c ws://127.0.0.1:8301<br/><br/>

<span className="text-zinc-500"># Send your credentials</span><br/>
<span className="text-zinc-400">&gt;</span> {'{"action": "authenticate", "username": "david", "password": "perez"}'}<br/>
<span className="text-zinc-400">&lt;</span> {'[{"status": "ok", "message": "Authenticated as david"}]'}<br/><br/>

<span className="text-zinc-500"># Run a query</span><br/>
<span className="text-zinc-400">&gt;</span> FIND users<br/>
<span className="text-zinc-400">&lt;</span> {'[{"status": "ok", "documents": [...]}]'}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Realtime Subscriptions (LISTEN)</h2>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          CleaveDB isn't just a database; it can act as a fully-fledged real-time Pub/Sub message broker. By connecting a WebSocket client to port <code>8301</code>, you can subscribe to specific documents or entire buckets. Any <code>POUR</code>, <code>CHANGE</code>, or <code>LINK</code> executed anywhere on the database will instantly push JSON events to your frontend.
        </p>
        <div className="bg-zinc-900 text-zinc-300 p-6 rounded-xl mb-8 font-mono text-sm leading-relaxed overflow-x-auto shadow-inner">
          <div className="text-zinc-500 mb-2">/* Subscribe to all events in the chat bucket */</div>
          LISTEN TO chat<br/><br/>
          
          <div className="text-zinc-500 mb-2">/* Subscribe exclusively to updates on David's profile */</div>
          LISTEN TO users "david"
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 mt-12 tracking-tight">Interactive Chat Demo</h3>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          To see the full power of real-time CleaveQL subscriptions in action, we included a highly-responsive interactive CLI chat simulation using purely CleaveDB WebSockets (complete with real-time Facebook Messenger style typing indicators!).
        </p>
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">Terminal (Split View)</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-zinc-500"># 1. Start the server</span><br/>
<span className="text-pink-400">python</span> cleavedb_server.py<br/><br/>

<span className="text-zinc-500"># 2. Open Terminal A</span><br/>
<span className="text-pink-400">python</span> tests/websocket/david.py<br/><br/>

<span className="text-zinc-500"># 3. Open Terminal B</span><br/>
<span className="text-pink-400">python</span> tests/websocket/jessy.py
            </pre>
          </div>
        </div>
        <p className="text-sm text-zinc-500 mt-4 italic">
          Type a message in one terminal and watch it appear instantly in the other via WebSockets!
        </p>
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Multi-Node Raft Consensus (High Availability Cluster)</h2>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          CleaveDB is fully distributed. Using a custom Python-native <strong>Raft Consensus</strong> implementation, CleaveDB provides Zero-Downtime, Disaster Survival, and High Availability replication.
        </p>
        <p className="text-zinc-600 mb-6 leading-relaxed">
          When you send a <code>POUR</code> or <code>CHANGE</code> write command to the cluster, the Leader node intercepts it. The command is mathematically appended to the distributed Raft Log. Once the majority (Quorum) acknowledges writing the WAL, it is committed to memory. If a node crashes, the cluster seamlessly elects a new leader with no data loss!
        </p>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 mt-8 tracking-tight">Run multiple nodes to form a cluster:</h3>
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/50 border-b border-zinc-800">
            <span className="text-xs font-medium text-zinc-500 font-mono">Terminal (Node 1, 2, 3)</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
<span className="text-pink-400">python</span> cleavedb_server.py --port 8301 --raft-port 8311 --peers 127.0.0.1:8321,127.0.0.1:8331 --data node1<br/>
<span className="text-pink-400">python</span> cleavedb_server.py --port 8311 --raft-port 8321 --peers 127.0.0.1:8311,127.0.0.1:8331 --data node2<br/>
<span className="text-pink-400">python</span> cleavedb_server.py --port 8321 --raft-port 8331 --peers 127.0.0.1:8311,127.0.0.1:8321 --data node3
            </pre>
          </div>
        </div>
        <p className="text-sm text-zinc-500 mt-4 italic">
          Note: TCP connections bypass Raft and write directly to the local engine. Only WebSocket and HTTP requests replicate through the Raft Consensus group.
        </p>
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-6 tracking-tight">Client Lifecycle & Wire Protocol</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
            <h3 className="font-semibold text-zinc-900 mb-2">1. Authentication Phase</h3>
            <p className="text-sm text-zinc-600">Clients must immediately authenticate via <code>register</code>, <code>login</code>, or <code>forgot</code> over the socket.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
            <h3 className="font-semibold text-zinc-900 mb-2">2. Query Phase</h3>
            <p className="text-sm text-zinc-600">Send raw CleaveQL strings over the socket. Responses are returned as JSON Arrays.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
            <h3 className="font-semibold text-zinc-900 mb-2">3. Disconnection</h3>
            <p className="text-sm text-zinc-600">Use <code>logout</code> to drop back to the login screen, or <code>exit</code> to terminate the connection entirely.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 mb-4 mt-8 tracking-tight">CLI Built-in Commands</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-900">
                <th className="py-3 px-4 font-semibold">Command</th>
                <th className="py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-mono font-medium">help / ?</td>
                <td className="py-3 px-4">Print the complete CleaveQL manual inside the shell</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-mono font-medium">logout</td>
                <td className="py-3 px-4">Close active session, return to login screen</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="py-3 px-4 font-mono font-medium">cls / clear</td>
                <td className="py-3 px-4">Clear terminal screen</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium">exit / quit</td>
                <td className="py-3 px-4">Close connection and exit shell process</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full h-px bg-zinc-100 my-10"></div>

      <div className="flex justify-between items-center pt-4">
        <Link href="/docs/installation" className="text-sm font-medium text-zinc-500 hover:text-zinc-700 flex items-center gap-1 transition-colors">
          &larr; Installation & Build
        </Link>
        <Link href="/docs/core-concepts/cleaveql" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
          Next: CleaveQL Syntax &rarr;
        </Link>
      </div>
    </>
  );
}
