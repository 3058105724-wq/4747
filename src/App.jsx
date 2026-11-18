import { useState, useEffect, useRef } from 'react';
import './App.css';

const TITLES = {
  chat:     { icon: '💬', text: '对话' },
  settings: { icon: '⚙️', text: '设置' },
  memory:   { icon: '🧠', text: '记忆' }
};

function App() {
  const [activePage, setActivePage] = useState('chat');
  const [temp, setTemp] = useState(65);
  const [tokens, setTokens] = useState(2048);
  const [toggles, setToggles] = useState({ stream: true, memory: true, reminder: false });
  const chatMessagesRef = useRef(null);

  const title = TITLES[activePage];

  useEffect(() => {
    if (activePage === 'chat' && chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [activePage]);

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>我的日记本</h2>
          <button className="new-chat-btn" aria-label="新建对话">+</button>
        </div>
        <nav className="nav-menu">
          <div className={`nav-item ${activePage === 'chat' ? 'active' : ''}`} onClick={() => setActivePage('chat')}><span className="nav-icon">💬</span><span>对话</span></div>
          <div className={`nav-item ${activePage === 'settings' ? 'active' : ''}`} onClick={() => setActivePage('settings')}><span className="nav-icon">⚙️</span><span>设置</span></div>
          <div className={`nav-item ${activePage === 'memory' ? 'active' : ''}`} onClick={() => setActivePage('memory')}><span className="nav-icon">🧠</span><span>记忆</span></div>
        </nav>
        <div className="chat-list-title">最近对话</div>
        <div className="chat-list">
          <div className="chat-item active"><div className="avatar">💬</div><div className="info"><div className="name">温柔设计提案</div><div className="preview">淡蓝与淡粉的搭配…</div></div></div>
          <div className="chat-item"><div className="avatar">📝</div><div className="info"><div className="name">日记 · 四月</div><div className="preview">安静的一天，有风…</div></div></div>
        </div>
        <div className="sidebar-footer"><div className="user-avatar">我</div><div className="user-name">小暖</div></div>
      </aside>

      <main className="main-panel">
        <div className="top-bar">
          <div className="page-title"><span className="title-icon">{title.icon}</span>{title.text}</div>
          <div className="top-right-actions"><button className="icon-btn" aria-label="更多">⋯</button></div>
        </div>

        <div className="content-scroll">
          {activePage === 'chat' && (
            <div className="page active">
              <div className="chat-page">
                <div className="chat-messages" ref={chatMessagesRef}>
                  <div className="message-row"><div className="message-avatar">🤖</div><div><div className="message-bubble">你好呀，我是你的家居设计助手。淡蓝和淡粉的搭配，像晴天里的一小片云。<br />我们可以从对话界面开始，慢慢把家的感觉搭建出来。</div><div className="message-time">10:24</div></div></div>
                  <div className="message-row user"><div className="message-avatar">🧑</div><div><div className="message-bubble">喜欢这种轻盈又温柔的感觉，圆角和留白都刚刚好。</div><div className="message-time">10:26</div></div></div>
                  <div className="message-row"><div className="message-avatar">🤖</div><div><div className="message-bubble">收到～ 气泡用了很淡的粉，你的消息是淡蓝，像左右两页日记纸。</div><div className="message-time">10:27</div></div></div>
                </div>
                <div className="input-area"><div className="input-container"><input type="text" placeholder="写点什么…" /><button className="send-btn" aria-label="发送">→</button></div></div>
              </div>
            </div>
          )}

          {activePage === 'settings' && (
            <div className="page active">
              <div className="settings-section">
                <div className="section-card accent">
                  <h3>📝 系统提示词</h3>
                  <p className="subtitle">定义助手的角色与语气，像在日记本开头写下今天的基调。</p>
                  <div className="form-group">
                    <div className="form-label"><span>角色设定</span><span className="hint">按下回车可换行</span></div>
                    <textarea className="form-textarea" defaultValue="你是一个温柔、耐心的家居设计助手。你擅长用简洁的语言描述空间与色彩，喜欢用比喻让设计变得可感。你的语气像晴天里的一小片云，轻盈但不轻浮。" />
                  </div>
                </div>
                <div className="section-card">
                  <h3>🎛️ 模型参数</h3>
                  <p className="subtitle">调节回应的风格与长度，找到最舒服的对话节奏。</p>
                  <div className="form-group">
                    <div className="form-label"><span>温度 (Temperature)</span><span className="hint">越高越有创造力</span></div>
                    <div className="slider-group"><input type="range" className="slider-input" min="0" max="100" value={temp} onChange={(e) => setTemp(e.target.value)} /><span className="slider-value">{(temp / 100).toFixed(2)}</span></div>
                  </div>
                  <div className="form-group">
                    <div className="form-label"><span>最大长度 (Max Tokens)</span><span className="hint">单次回应的字数上限</span></div>
                    <div className="slider-group"><input type="range" className="slider-input" min="256" max="4096" step="256" value={tokens} onChange={(e) => setTokens(e.target.value)} /><span className="slider-value">{tokens}</span></div>
                  </div>
                </div>
                <div className="section-card">
                  <h3>🌤️ 对话偏好</h3>
                  <p className="subtitle">一些让对话更舒服的小开关。</p>
                  <div className="toggle-group"><div><div className="toggle-label">流式输出</div><div className="toggle-desc">逐字显示回应，像手写一样自然</div></div><div className={`toggle-switch ${toggles.stream ? 'active' : ''}`} onClick={() => toggle('stream')} /></div>
                  <div className="toggle-group"><div><div className="toggle-label">自动记忆</div><div className="toggle-desc">让助手记住对话中的关键信息</div></div><div className={`toggle-switch ${toggles.memory ? 'active' : ''}`} onClick={() => toggle('memory')} /></div>
                  <div className="toggle-group"><div><div className="toggle-label">温柔提醒</div><div className="toggle-desc">在长对话中适时提醒休息</div></div><div className={`toggle-switch ${toggles.reminder ? 'active' : ''}`} onClick={() => toggle('reminder')} /></div>
                </div>
                <div className="btn-group"><button className="btn btn-secondary">恢复默认</button><button className="btn btn-primary">保存设置</button></div>
              </div>
            </div>
          )}

          {activePage === 'memory' && (
            <div className="page active">
              <div className="memory-section">
                <div className="memory-stats">
                  <div className="stat-card"><div className="stat-value">12</div><div className="stat-label">条记忆</div></div>
                  <div className="stat-card"><div className="stat-value">4</div><div className="stat-label">偏好标签</div></div>
                  <div className="stat-card"><div className="stat-value">3</div><div className="stat-label">最近更新</div></div>
                </div>
                <div className="search-box"><span className="search-icon">🔍</span><input type="text" placeholder="搜索记忆内容…" /></div>
                <div className="memory-list">
                  <div className="memory-item preference"><div className="memory-icon">💗</div><div className="memory-content"><div className="memory-header"><span className="memory-tag pref-tag">偏好</span><span className="memory-time">昨天</span></div><div className="memory-text">喜欢淡蓝色和淡粉色搭配，偏好简洁、有呼吸感的界面，圆角要柔和。</div><div className="memory-source">来自「温柔设计提案」对话</div></div></div>
                  <div className="memory-item fact"><div className="memory-icon">🏠</div><div className="memory-content"><div className="memory-header"><span className="memory-tag fact-tag">事实</span><span className="memory-time">3 天前</span></div><div className="memory-text">正在装修一间约 60㎡ 的小户型，希望客厅有阳光感。</div><div className="memory-source">来自「温柔设计提案」对话</div></div></div>
                  <div className="memory-item preference"><div className="memory-icon">✍️</div><div className="memory-content"><div className="memory-header"><span className="memory-tag pref-tag">偏好</span><span className="memory-time">5 天前</span></div><div className="memory-text">喜欢圆体字和手写感，不喜欢过于正式的界面。</div><div className="memory-source">来自「日记 · 四月」对话</div></div></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;