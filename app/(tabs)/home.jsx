import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import Blogs from '../../components/Blogs';
import Topic from '../../components/Topic';
import AppLoader from "../../components/AppLoader";
import { LinearGradient } from 'expo-linear-gradient';
import Line from '../../assets/images/line.svg'; 

export default function HomeScreen() {
  const [topic, setTopic] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentTopic = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/topic/get`, {
          withCredentials: true,
        });
        setTopic(response.data);
        const blogsResponse = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/blog/all`, {
          withCredentials: true,
        });
        setBlogs(blogsResponse.data.blogs);
      } catch (err) {
        console.error('Error fetching current topic:', err);
        setError('Failed to fetch topic');
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentTopic();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['hsla(242, 47%, 13%, 1)', 'hsla(256, 31%, 23%, 1)']}
        className="flex-1"
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View>
          <View className='mb-3'>
            <Text className='text-3xl font-bold text-white'>Welcome</Text>
          </View>
          <Topic topic={topic}/>
          <ScrollView>
            <View className="bg-[#2F2753] mx-1 flex rounded-3xl">
              <View className='flex justify-center items-center mt-5'>
              <Line/>
              </View>
              <Blogs blogs={blogs}/>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}