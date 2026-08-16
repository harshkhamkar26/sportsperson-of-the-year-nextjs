import React from 'react';
import Layout from '../components/Layout';

export default function TermsOfService() {
  return (
    <Layout title="Terms of Service - UAIU Athletics">
      <div className="pt-8 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-on-surface-variant font-body-lg">
          <p>Effective Date: October 2024</p>
          <p>By using the Universal AI University Athletics portal and SPOTY application, you agree to these Terms of Service.</p>
          <h2>User Responsibilities</h2>
          <p>You agree to use the application for its intended purpose of viewing and managing athletic performance. Unauthorized access or tampering with point entries is strictly prohibited.</p>
          <h2>Data Accuracy</h2>
          <p>While we strive to keep all leaderboard and point data accurate, Universal AI University reserves the right to correct errors or update points post-event upon administrative review.</p>
        </div>
      </div>
    </Layout>
  );
}
