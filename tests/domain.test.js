import test from 'node:test';
import assert from 'node:assert/strict';
import {summarize,scoreValue,csv,validateMeeting} from '../src/domain.js';
test('attendance keeps unmarked distinct from absent, and counts only snapshot enrollment',()=>{const roster=[{id:'a'}];const rows=[{roster,attendance:{a:{status:'H'}}},{roster,attendance:{a:{status:'A'}}},{roster,attendance:{}},{roster:[{id:'b'}],attendance:{}}];assert.deepEqual(summarize(rows,'a'),{H:1,S:0,I:0,A:1,unmarked:1,total:3,percent:33});});
test('zero is a valid grade; empty is not zero',()=>{assert.equal(scoreValue(''), '');assert.equal(scoreValue('0'),0);assert.equal(scoreValue('87.5'),87.5);assert.throws(()=>scoreValue('101'));assert.throws(()=>scoreValue('-1'));});
test('CSV quotes commas and prevents spreadsheet formula injection',()=>{const out=csv([['=SUM(1,2)','A "quoted" name',0]]);assert.ok(out.includes('"\'=SUM(1,2)"'));assert.ok(out.includes('"A ""quoted"" name"'));assert.ok(out.endsWith('"0"'));});
test('meeting requires class subject topic date time and enrolled students',()=>{assert.throws(()=>validateMeeting({}));assert.throws(()=>validateMeeting({classId:'a',subjectId:'b',date:'2026-09-15',time:'07:30',topic:'Test',roster:[]}));});
test('no enrollment yields no percentage',()=>assert.equal(summarize([],'a').percent,null));
