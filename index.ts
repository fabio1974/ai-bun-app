import concurrently from 'concurrently';

concurrently([
    {
        command: 'bun run dev',
        name: 'server',
        prefixColor: 'cyan.bold',
        cwd: 'packages/server',
    },
    {
        command: 'bun run dev',
        name: 'client',
        prefixColor: 'green.bold',
        cwd: 'packages/client',
    },
]);
