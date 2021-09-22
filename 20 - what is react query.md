# What is React Query? ⚛

    - Data synchronization library: fetching, caching, updating

    - Data sources: REST, GraphQL, etc., as long as it returns a promise

    - Stale-While-Revalidate

Cached data as often as possible
While updating that data in the background as often as it makes sense for the components that consume it.

    - You provide the fetching logic and React Query takes care of fetching, caching, background updates, garbage collection, etc.

    - Place React Query queries anywhere without worrying about duplicate network requests

    - Configure to do request cancellation, offline support, prefetching, pagination, etc.

    - Dedicated dev tools
