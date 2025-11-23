@IsTest
private class MyIterableTest {
    @IsTest
    static void testIterableForLoop() {
        // Arrange
        List<String> strings = new List<String>{ 'Hello', 'World' };

        // Act: explicitly create an instance of MyIterable, then iterate
        MyIterable iterable = new MyIterable(strings);
        List<String> seen = new List<String>();
        for (String s : iterable) {
            System.debug(s);
            seen.add(s);
        }

        // Assert: validate order and contents
        System.assertEquals(2, seen.size(), 'Expected to iterate two items');
        System.assertEquals('Hello', seen[0], 'First element should be Hello');
        System.assertEquals('World', seen[1], 'Second element should be World');
    }
}
