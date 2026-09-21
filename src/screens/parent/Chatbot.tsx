import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontFamily, Radius, Spacing } from '@/constants/theme';
import { studentById } from '@/constants/mock';
import { FadeInView } from '@/components/ui/Reveal';
import { api } from '@/services/api';
import { useAuthStore } from '@/store/auth';

interface Message {
  id: string;
  from: 'user' | 'bot';
  text: string;
}

const SUGGESTIONS = [
  'Is my child\'s fee paid?',
  'Did my child go to school today?',
  'What homework did my child get?',
  'How is my child doing?',
  'What are the school timings?',
  'Do you provide transport?',
];

function seedMessage(): string {
  const user = useAuthStore.getState().user;
  const names = (user?.linkedStudentIds ?? [])
    .map((id) => studentById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => s.name)
    .join(' and ');
  const hint = names
    ? ` You can ask me about ${names}'s fees, attendance, homework or progress.`
    : ' Ask me about fees, attendance, homework, timings, transport, events and admissions.';
  return `Hi! I'm Sagar, Siksha Sagar's AI assistant. 👋 I can answer school questions — timings, transport, events, admissions — or questions about your child.${hint}`;
}

export default function ParentChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm0',
      from: 'bot',
      text: seedMessage(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setInput('');
    setMessages((prev) => [...prev, { id: `u${Date.now()}`, from: 'user', text: trimmed }]);
    setTyping(true);
    const res = await api.askChatbot(trimmed);
    setTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: `b${Date.now()}`, from: 'bot', text: res.data?.answer ?? 'Sorry, I couldn\'t answer that right now.' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ChatHeader />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((m, i) => (
            <View key={m.id} style={[styles.bubbleRow, m.from === 'user' ? styles.userRow : styles.botRow]}>
              <FadeInView delay={Math.min(i * 40, 240)} distance={10} style={styles.fadeRow}>
                {m.from === 'bot' ? (
                  <View style={styles.botAvatar}>
                    <MaterialCommunityIcons name="robot" size={18} color={Colors.white} />
                  </View>
                ) : null}
                <View style={[styles.bubble, m.from === 'user' ? styles.userBubble : styles.botBubble]}>
                  <Text style={[styles.bubbleText, m.from === 'user' && styles.userBubbleText]}>{m.text}</Text>
                </View>
              </FadeInView>
            </View>
          ))}
          {typing ? (
            <View style={styles.typingRow}>
              <View style={styles.botAvatar}>
                <MaterialCommunityIcons name="robot" size={18} color={Colors.white} />
              </View>
              <View style={[styles.bubble, styles.botBubble]}>
                <Text style={styles.typingText}>Sagar is typing…</Text>
              </View>
            </View>
          ) : null}
        </ScrollView>

        {messages.length <= 1 ? (
          <FadeInView distance={12}>
            <View style={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <Pressable key={s} style={styles.suggestionChip} onPress={() => send(s)}>
                  <Text style={styles.suggestionText}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </FadeInView>
        ) : null}

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask me anything…"
            placeholderTextColor={Colors.textMuted}
            onSubmitEditing={() => send(input)}
            returnKeyType="send"
          />
          <Pressable style={styles.sendBtn} onPress={() => send(input)}>
            <MaterialCommunityIcons name="send" size={20} color={Colors.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ChatHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerAvatar}>
        <MaterialCommunityIcons name="robot" size={22} color={Colors.white} />
      </View>
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>Sagar — AI Assistant</Text>
        <Text style={styles.headerSub}>Online • replies instantly</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: 20,
    paddingVertical: Spacing.three,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontFamily: FontFamily.display,
    fontWeight: '800',
    color: Colors.text,
  },
  headerSub: {
    fontSize: 12,
    fontFamily: FontFamily.body,
    color: Colors.success,
  },
  messages: {
    padding: 20,
    gap: Spacing.three,
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
  },
  fadeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.lg,
  },
  botBubble: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    fontFamily: FontFamily.body,
    color: Colors.text,
    lineHeight: 20,
  },
  userBubbleText: {
    color: Colors.white,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  typingText: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Colors.textSecondary,
  },
  suggestions: {
    paddingHorizontal: 20,
    paddingBottom: Spacing.three,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  suggestionChip: {
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: '#C7E5F8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  suggestionText: {
    fontSize: 13,
    fontFamily: FontFamily.display,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: 12,
    paddingBottom: 20,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 46,
    fontSize: 15,
    fontFamily: FontFamily.body,
    color: Colors.text,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
