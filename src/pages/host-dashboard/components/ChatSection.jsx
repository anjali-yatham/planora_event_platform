import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatSection = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState({});
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'Thanks for the event details!',
      timestamp: '5 min ago',
      unreadCount: 0,
      isOnline: true,
      type: 'attendee'
    },
    {
      id: 2,
      name: 'Mike Chen',
      lastMessage: 'Can you share the venue address?',
      timestamp: '12 min ago',
      unreadCount: 2,
      isOnline: true,
      type: 'attendee'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      lastMessage: 'Event Team',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      type: 'cohost'
    }
  ]);

  // Initialize messages for each chat
  useEffect(() => {
    const initialMessages = {
      1: [
        {
          id: 1,
          senderId: 1,
          senderName: 'Sarah Johnson',
          message: 'Thanks for organizing this event!',
          timestamp: '2:15 PM',
          isOwn: false,
          delivered: true
        },
        {
          id: 2,
          senderId: 'host',
          senderName: 'You',
          message: 'You\'re welcome! Looking forward to seeing you there.',
          timestamp: '2:20 PM',
          isOwn: true,
          delivered: true
        }
      ],
      2: [
        {
          id: 1,
          senderId: 2,
          senderName: 'Mike Chen',
          message: 'Hi! I registered for the React Workshop. Can you share the venue address?',
          timestamp: '2:30 PM',
          isOwn: false,
          delivered: true
        },
        {
          id: 2,
          senderId: 'host',
          senderName: 'You',
          message: 'Hi Mike! The venue is at Tech Hub, 123 Main St, San Francisco. We\'ll send detailed directions via email soon.',
          timestamp: '2:32 PM',
          isOwn: true,
          delivered: true
        },
        {
          id: 3,
          senderId: 2,
          senderName: 'Mike Chen',
          message: 'Perfect, thank you! Looking forward to the workshop.',
          timestamp: '2:35 PM',
          isOwn: false,
          delivered: true
        }
      ],
      3: [
        {
          id: 1,
          senderId: 3,
          senderName: 'Emily Rodriguez',
          message: 'Hey! How are the preparations going for tomorrow\'s event?',
          timestamp: '1:30 PM',
          isOwn: false,
          delivered: true
        }
      ]
    };
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage = {
        id: Date.now(),
        senderId: 'host',
        senderName: 'You',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isOwn: true,
        delivered: false
      };

      // Add message to the chat
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage]
      }));

      // Update last message in chats list
      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { ...chat, lastMessage: message.trim(), timestamp: 'now' }
          : chat
      ));

      setMessage('');

      // Simulate message delivery with a slight delay
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [activeChat]: prev[activeChat].map(msg => 
            msg.id === newMessage.id ? { ...msg, delivered: true } : msg
          )
        }));
      }, 500);

      // Simulate storing in database (replace with actual API call)
      console.log('Message stored in database:', {
        chatId: activeChat,
        message: newMessage,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          variant="default"
          size="lg"
          iconName="MessageCircle"
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 shadow-lg"
        >
          {chats.reduce((total, chat) => total + chat.unreadCount, 0) > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {chats.reduce((total, chat) => total + chat.unreadCount, 0)}
            </div>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-card rounded-lg border border-border shadow-lg w-80 h-96 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={20} color="var(--color-primary)" />
            <h3 className="font-semibold text-card-foreground">
              {activeChat ? chats.find(c => c.id === activeChat)?.name : 'Messages'}
            </h3>
            {activeChat && (
              <div className={`w-2 h-2 rounded-full ${
                chats.find(c => c.id === activeChat)?.isOnline ? 'bg-green-400' : 'bg-gray-300'
              }`} />
            )}
          </div>
          <div className="flex items-center space-x-1">
            {activeChat && (
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={() => setActiveChat(null)}
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="Minus"
              onClick={() => setIsMinimized(true)}
            />
          </div>
        </div>

        {!activeChat ? (
          // Chat List
          <div className="flex-1 overflow-y-auto">
            {chats.length === 0 ? (
              <div className="p-6 text-center">
                <Icon name="MessageCircle" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-4 hover:bg-muted/30 transition-smooth cursor-pointer"
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {chat.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-card-foreground truncate">
                            {chat.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {chat.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unreadCount > 0 && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Individual Chat
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(messages[activeChat] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-card-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <div className={`flex items-center justify-between mt-1 ${
                      msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      <p className="text-xs">
                        {msg.timestamp}
                      </p>
                      {msg.isOwn && (
                        <div className="flex items-center space-x-1">
                          {msg.delivered ? (
                            <Icon name="CheckCheck" size={12} className="text-green-400" />
                          ) : (
                            <Icon name="Check" size={12} className="text-muted-foreground" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 bg-muted/30"
                  />
                </div>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Send"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSection;