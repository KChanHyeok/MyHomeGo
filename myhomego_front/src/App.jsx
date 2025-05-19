import React from 'react';
import Layout from './components/Layout';
import AnnouncementList from './pages/AnnouncementList';

function App() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">공고 목록</h1>
        <AnnouncementList />
      </div>
    </Layout>
  );
}

export default App;
