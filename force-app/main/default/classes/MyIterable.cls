public with sharing class MyIterable implements Iterable<String> {
    // Backing list for iteration
    private List<String> strings;

    /**
     * Constructor
     * @param strings List of strings to iterate over
     */
    public MyIterable(List<String> strings) {
        // Initialize the class variable from the constructor argument
        this.strings = strings;
    }

    /**
     * Provide an iterator over the stored strings
     */
    public Iterator<String> iterator() {
        return strings.iterator();
    }
}
