import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],test:{include:['tests/ui.test.jsx'],environment:'jsdom',testTimeout:30000,pool:'forks',maxWorkers:1,minWorkers:1},optimizeDeps:{noDiscovery:true}});


