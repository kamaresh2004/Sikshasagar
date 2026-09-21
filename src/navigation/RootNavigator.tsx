import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MainTabs from '@/navigation/MainTabs';
import { RootStackParamList } from '@/navigation/types';
import EnquiriesScreen from '@/screens/management/Enquiries';
import FeesScreen from '@/screens/management/Fees';
import GalleryApprovalScreen from '@/screens/management/GalleryApproval';
import AttendanceReportsScreen from '@/screens/management/AttendanceReports';
import AnnouncementsScreen from '@/screens/management/Announcements';
import StudentDetailScreen from '@/screens/management/StudentDetail';
import ParentAttendanceHistoryScreen from '@/screens/parent/AttendanceHistory';
import ParentChatbotScreen from '@/screens/parent/Chatbot';
import ChildProfileScreen from '@/screens/parent/ChildProfile';
import ParentContactScreen from '@/screens/parent/Contact';
import ParentActivitiesScreen from '@/screens/parent/Activities';
import ParentPerformanceScreen from '@/screens/parent/Performance';
import ParentLeaveScreen from '@/screens/parent/Leave';
import ParentRequestLeaveScreen from '@/screens/parent/RequestLeave';
import TeacherLeaveRequestsScreen from '@/screens/teacher/LeaveRequests';
import ManagementLeaveRequestsScreen from '@/screens/management/LeaveRequests';
import ProfileScreen from '@/screens/shared/Profile';
import NotificationsScreen from '@/screens/shared/Notifications';
import TeacherEventsScreen from '@/screens/teacher/Events';
import TeacherHomeworkScreen from '@/screens/teacher/Homework';
import TeacherPerformanceScreen from '@/screens/teacher/Performance';
import TeacherUploadPhotosScreen from '@/screens/teacher/UploadPhotos';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right', gestureEnabled: true }}
    >
      <Stack.Screen name="Tabs" component={MainTabs} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
      <Stack.Screen name="Enquiries" component={EnquiriesScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
      <Stack.Screen name="Fees" component={FeesScreen} />
      <Stack.Screen name="Approvals" component={GalleryApprovalScreen} />
      <Stack.Screen name="AttendanceReports" component={AttendanceReportsScreen} />
      <Stack.Screen name="Homework" component={TeacherHomeworkScreen} />
      <Stack.Screen name="TeacherPerformance" component={TeacherPerformanceScreen} />
      <Stack.Screen name="Events" component={TeacherEventsScreen} />
      <Stack.Screen name="UploadPhotos" component={TeacherUploadPhotosScreen} />
      <Stack.Screen name="ChildProfile" component={ChildProfileScreen} />
      <Stack.Screen name="ParentPerformance" component={ParentPerformanceScreen} />
      <Stack.Screen name="ParentActivities" component={ParentActivitiesScreen} />
      <Stack.Screen name="AttendanceHistory" component={ParentAttendanceHistoryScreen} />
      <Stack.Screen name="Contact" component={ParentContactScreen} />
      <Stack.Screen name="Chatbot" component={ParentChatbotScreen} options={{ animation: 'fade_from_bottom' }} />
      <Stack.Screen name="ParentLeave" component={ParentLeaveScreen} />
      <Stack.Screen name="RequestLeave" component={ParentRequestLeaveScreen} />
      <Stack.Screen name="TeacherLeaveRequests" component={TeacherLeaveRequestsScreen} />
      <Stack.Screen name="ManagementLeaveRequests" component={ManagementLeaveRequestsScreen} />
    </Stack.Navigator>
  );
}
