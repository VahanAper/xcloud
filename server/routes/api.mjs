import express from 'express';

import db from '../db';

const router = express.Router();

router.get('/servers', (req, res, next) => {
  const query = `
    SELECT
      servers.id,
      servers.name as serverName,
      ip_assignments.id as IPAddressId,
      ip_assignments.ip_address as serverIPAddress,
      ip_assignments.type as serverIPType,
      ports.id as portId,
      ports.name as portName,
      ports.desc as portDescription,
      switches.name as switchName,
      bgp_states.prefix as bgpPrefix,
      bgp_states.state as bgpState,
      bgp_states.uptime as bgpUptime
    FROM servers
    LEFT JOIN ip_assignments
      ON (servers.id = ip_assignments.server_id)
    LEFT JOIN ports
      ON (servers.id = ports.server_id)
    LEFT JOIN switches
      ON (ports.switch_id = switches.id)
    LEFT JOIN bgp_states
      ON (ports.id = bgp_states.port_id)
  `;

  db.query(query, function (err, result) {
    if (err) {
      res.send({
        success: false,
        error: 'Something wrong with getting servers.'
      });
    };

    const servers = {};

    result.forEach(server => {
      const {
        id,
        serverName,
        portId,
        portName,
        portDescription,
        switchName,
        bgpPrefix,
        bgpState,
        bgpUptime,
        IPAddressId,
        serverIPAddress,
        serverIPType,
      } = server;

      if (!servers[id]) {
        servers[id] = {
          id,
          serverName,
          ports: {},
          IPAddresses: {},
        }
      }

      if (!servers[id].ports[portId]) {
        servers[id].ports[portId] = {
          portId,
          portName,
          portDescription,
          switchName,
          bgpPrefix,
          bgpState,
          bgpUptime,
        }
      }

      if (!servers[id].IPAddresses[IPAddressId]) {
        servers[id].IPAddresses[IPAddressId] = {
          IPAddressId,
          serverIPAddress,
          serverIPType,
        }
      }
    });

    const data = Object.values(servers).map((server) => {
      return {
        ...server,
        ports: Object.values(server.ports),
        IPAddresses: Object.values(server.IPAddresses),
      }
    });

    res.send({
      success: true,
      data
    });

    next();
  });
});

router.delete('/servers/:id', (req, res, next) => {
  const serverId = db.escape(req.params.id);

  const query = `
    DELETE FROM servers WHERE id=${serverId} LIMIT 1
  `;

  db.query(query, function (err, result) {
    if (err) {
      res.send({
        success: false,
        error: 'Server was not deleted.'
      });
    }

    res.send({
      success: true,
      data: serverId,
    });

    next();
  });
});

export default router;
