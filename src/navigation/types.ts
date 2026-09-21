export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  Notifications: undefined;
  Profile: undefined;
  StudentDetail: { studentId: string };
  Enquiries: undefined;
  Announcements: undefined;
  Fees: undefined;
  Approvals: undefined;
  AttendanceReports: undefined;
  Homework: undefined;
  TeacherPerformance: undefined;
  Events: undefined;
  UploadPhotos: undefined;
  ChildProfile: undefined;
  ParentPerformance: { studentId: string };
  ParentActivities: undefined;
  AttendanceHistory: { studentId: string };
  Contact: undefined;
  Chatbot: undefined;
  ParentLeave: undefined;
  RequestLeave: undefined;
  TeacherLeaveRequests: undefined;
  ManagementLeaveRequests: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Dashboard: undefined;
  Students: undefined;
  Teachers: undefined;
  Attendance: undefined;
  Activities: undefined;
  Gallery: undefined;
  Calendar: undefined;
  More: undefined;
};

export type ManagementNavParamList = RootStackParamList & MainTabsParamList;
export type TeacherNavParamList = RootStackParamList & MainTabsParamList;
export type ParentNavParamList = RootStackParamList & MainTabsParamList;
