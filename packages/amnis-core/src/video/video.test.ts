import { videoKey, videoCreate } from './video';

/**
 * ============================================================
 */
test('video key should be is properly set', () => {
  expect(videoKey).toEqual('video');
});

/**
 * ============================================================
 */
test('should create a video', () => {
  const video = videoCreate({
    title: 'Introduction to Amnis State',
  });

  expect(video).toEqual(
    expect.objectContaining({
      title: expect.any(String),
    }),
  );
});
