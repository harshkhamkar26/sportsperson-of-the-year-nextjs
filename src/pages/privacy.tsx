import React from 'react';
import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy - UAIU Athletics">
      <div className="pt-8 pb-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-on-surface-variant font-body-lg">
          <p>Effective Date: October 2024</p>
          <p>This Privacy Policy describes how Universal AI University Athletics collects, uses, and shares your personal data when you use the Sports Person of the Year application.</p>
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as your name, roll number, class name, and photo. We also collect performance data and point entries submitted by coaches.</p>
          <h2>How We Use Information</h2>
          <p>We use the information we collect to maintain the athletic leaderboard, award points, and operate the SPOTY program.</p>
        </div>
      </div>
    </Layout>
  );
}
