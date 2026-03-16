import {useState} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Search} from '../../components/Search';
import {Header} from '../../components/Header';
import {TextWrapper} from '../../components/Wrappers/Text';
import {theme} from '../../constants/theme';

type Post = {
  id: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  image?: boolean;
};

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'Priya M.',
    authorAvatar: '🐕',
    timeAgo: '2h ago',
    content:
      'Just adopted this cutie from the shelter! Meet Bruno. Any tips for first-time dog parents?',
    likes: 42,
    comments: 12,
  },
  {
    id: '2',
    author: 'Rahul K.',
    authorAvatar: '🐈',
    timeAgo: '5h ago',
    content:
      'Best vet in Hyderabad for cat vaccinations? Looking for someone gentle and affordable.',
    likes: 18,
    comments: 24,
  },
  {
    id: '3',
    author: 'Anitha R.',
    authorAvatar: '🐾',
    timeAgo: '1d ago',
    content:
      'Pet-friendly cafes in the city? Want to take my golden retriever out for a weekend brunch.',
    likes: 56,
    comments: 8,
  },
  {
    id: '4',
    author: 'Sneha P.',
    authorAvatar: '🐶',
    timeAgo: '2d ago',
    content:
      'Share your favourite homemade dog treat recipes! Here’s mine: peanut butter + oats + banana.',
    likes: 89,
    comments: 31,
  },
];

export function Community({navigation}: {navigation: any}) {
  const [searchValue, setSearchValue] = useState('');

  const filtered = searchValue.trim()
    ? MOCK_POSTS.filter(
        p =>
          p.content.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.author.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : MOCK_POSTS;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Header text="Pet Community" navigation={navigation} />
      <View style={styles.searchWrap}>
        <Search
          height={40}
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
        />
      </View>
      <TextWrapper
        text="Connect with pet parents. Share tips, ask questions, and find local recommendations."
        color={theme.colors.textSecondary}
        fontSize={theme.typography.caption}
        style={styles.subtitle}
      />
      <View style={styles.feed}>
        {filtered.length === 0 ? (
          <TextWrapper
            text="No posts match your search."
            color={theme.colors.textMuted}
            style={styles.empty}
          />
        ) : (
          filtered.map(post => (
            <TouchableOpacity
              key={post.id}
              style={styles.card}
              activeOpacity={0.9}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <TextWrapper text={post.authorAvatar} fontSize={24} />
                </View>
                <View style={styles.cardMeta}>
                  <TextWrapper
                    text={post.author}
                    fontSize={theme.typography.body}
                  />
                  <TextWrapper
                    text={post.timeAgo}
                    color={theme.colors.textMuted}
                    fontSize={theme.typography.small}
                  />
                </View>
              </View>
              <TextWrapper
                text={post.content}
                fontSize={theme.typography.body}
                color={theme.colors.text}
                style={styles.content}
              />
              <View style={styles.actions}>
                <TextWrapper
                  text={`❤️ ${post.likes}`}
                  fontSize={theme.typography.caption}
                  color={theme.colors.textMuted}
                />
                <TextWrapper
                  text={`💬 ${post.comments}`}
                  fontSize={theme.typography.caption}
                  color={theme.colors.textMuted}
                />
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing.sm,
    marginHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: theme.colors.backgroundWarm,
  },
  searchWrap: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: theme.spacing.lg,
  },
  feed: {
    gap: 12,
  },
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    ...theme.shadow.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardMeta: {flex: 1},
  content: {
    lineHeight: 22,
    marginBottom: theme.spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
});
