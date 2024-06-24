import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { StyleSheet } from 'react-native';

export default function RewardsScreen() {
  return (
    <Layout style={styles.container}>
      <Header text="Rewards" />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
