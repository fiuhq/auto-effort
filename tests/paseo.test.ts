import { expect, test } from 'claude-code/testing'

import { requestOf } from '../hooks/paseo'

test('a Paseo agent-message is judged by the request inside its envelope, and other text as written', async () => {
  const envelope = '<paseo-system version="1" kind="agent-message" source-agent-id="a1" message-id="m1" source-agent-title="Plan">\nDesign the reclamation scheme\nfor the queue\n</paseo-system>'
  expect(requestOf(envelope)).toBe('Design the reclamation scheme\nfor the queue')
  expect(requestOf('fix the typo in greet.py')).toBe('fix the typo in greet.py')
  const notice = '<paseo-system version="1" kind="notice">\nsomething else\n</paseo-system>' // only agent-messages are unwrapped
  expect(requestOf(notice)).toBe(notice)
  const quoted = 'what does <paseo-system kind="agent-message">x</paseo-system> mean here?' // an envelope inside a prompt stays
  expect(requestOf(quoted)).toBe(quoted)
})
