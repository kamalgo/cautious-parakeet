# Exit the script immediately on any command error
set -e
cd /var/www/html
# Clear the folder
rm -rf *
# Update the frontend
cd /root/Bcci/frontend
npm ci
npm run build
# Move the build to the server folder
cd dist
cp -r . /var/www/html
# Update the backend
cd /root/Bcci/backend
npm ci
# start services
pm2 stop all || true
pm2 start 'npm run prod' --name bcci