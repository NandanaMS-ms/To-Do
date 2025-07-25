// App.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const CATEGORIES = ['new', 'working', 'completed', 'deleted'];
const API_URL = 'http://172.20.10.3:3001/tasks';

export default function App() {
  const [tasks, setTasks] = useState({ new: [], working: [], completed: [], deleted: [] });
  const [input, setInput] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load tasks.');
    }
  };

  const addTask = async () => {
    if (!input.trim()) return;
    console.log("Adding task:", input);
    try {
      await axios.post(API_URL, { task: input });
      setInput('');
      fetchTasks();
    } catch (err) {
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  const moveTask = async (text, from, to) => {
    try {
      await axios.put(`${API_URL}/move`, { task: text, from, to });
      fetchTasks();
    } catch (err) {
      Alert.alert('Error', 'Failed to move task.');
    }
  };

  const deleteTask = async (text, from) => {
    try {
      await axios.delete(API_URL, { data: { task: text, from } });
      fetchTasks();
    } catch (err) {
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTasks = (zone) => (
    <View style={[styles.card, styles[`${zone}Card`]]} key={zone}>
      <Text style={[styles.cardTitle, styles[zone]]}>
        {zone.charAt(0).toUpperCase() + zone.slice(1)} ({tasks[zone].length})
      </Text>

      {zone === 'new' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter task..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addTask}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}

      {tasks[zone].map((task, idx) => (
        <View key={`${zone}-${task}-${idx}`} style={styles.taskItem}>
          <Text style={styles.taskText}>{task}</Text>
          <View style={styles.actionBtns}>
            {zone !== 'deleted' && (
              <TouchableOpacity onPress={() => deleteTask(task, zone)}>
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>
            )}
            {CATEGORIES.filter(z => z !== zone && z !== 'deleted').map(z => (
              <TouchableOpacity key={`${task}-${z}`} onPress={() => moveTask(task, zone, z)}>
                <Text style={styles.moveBtn}>➡ {z}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>TO <Text style={{ color: '#4f46e5' }}> - </Text><Text style={{ color: '#059669' }}>DO</Text></Text>
        {CATEGORIES.map(cat => renderTasks(cat))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaf9',
    padding: 10,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#eab308',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderLeftWidth: 6,
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  new: { color: '#ca8a04' },
  working: { color: '#4f46e5' },
  completed: { color: '#059669' },
  deleted: { color: '#6b7280' },
  newCard: { borderColor: '#facc15' },
  workingCard: { borderColor: '#818cf8' },
  completedCard: { borderColor: '#34d399' },
  deletedCard: { borderColor: '#9ca3af' },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 8,
    borderRadius: 6,
  },
  addBtn: {
    backgroundColor: '#facc15',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  taskText: {
    fontSize: 14,
    marginBottom: 6,
  },
  actionBtns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  delete: {
    color: '#dc2626',
    marginRight: 6,
  },
  moveBtn: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    color: '#1e3a8a',
  },
});
